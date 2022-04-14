const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

const { config } = require('./../config/config');

const UserService = require('./users');
const service = new UserService();

class AuthService {

  async getUser(email, password){
    const user = await service.findByEmail(email);
      if (!user) {
        throw boom.unauthorized();
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw boom.unauthorized();
      }
      delete user.dataValues.password;
      return user;
  }

  signToken(user){
    const payload = {
      sub: user.id,
      role: user.role
    }
    const token = jwt.sign(payload, config.jwtSecret);
    return {
      user,
      token
    };
  }

  async sendMail(email){
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      secure: false, // true for 465, false for other ports
      port: 587,
      auth: {
          user: 'nakia.olson39@ethereal.email',
          pass: 'T4ZFqgTnESbHHaCpEh'
      }
    });
    await transporter.sendMail({
      from: 'nakia.olson39@ethereal.email', // sender address
      to: `${user.email}`, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
    return { message: 'mail sent' };
  }
}

module.exports = AuthService;