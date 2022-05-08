import { recoverPersonalSignature } from "eth-sig-util";
import { bufferToHex } from "ethereumjs-util";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../../db";

import { config } from "../../config";
import { User } from "../../entity/User";
import { sign } from "crypto";

export const create = async (req: Request, res: Response) => {
  const userRepository = await AppDataSource.getRepository(User);
  const { signature, public_address } = req.body;
  if (!signature || !public_address) {
    return res
      .status(400)
      .send({ error: "Request should have signature and public_address" });
  }
  // Get the user with the given pulicaddress
  const user = await userRepository.findOneBy({ public_address });

  if (!user) {
    res.status(401).send({
      error: `User with public_address ${public_address} is not found in database`,
    });
  }

  // Verify digital signature
  if (!(user instanceof User)) {
    // Should not happen, we should have already sent the response
    throw new Error('User is not defined in "Verify digital signature".');
  }

  const msg = `I am signing my one-time nonce: ${user.nonce}`;

  /* We now are in possession of msg, public_address and signature. We will use a helper
  from eth-sig-util to extract the address from the signature */
  const msgBufferHex = bufferToHex(Buffer.from(msg, 'utf-8'));
  const address = recoverPersonalSignature({
    data: msgBufferHex,
    sig: signature,
  });
  
  /* 	The signature verification is successful if the address found with
  sigUtil.recoverPersonalSignature matches the initial public_address */
  if(address.toLocaleLowerCase() === public_address.toLocaleLowerCase()) {
    return user;
  } else {
    res.status(401)
      .send({
        error: 'Signature verification failed'
      });
  }

  // Generate a new nounce for the user
  if(!(user instanceof User)) {
    // Should not happen, we sould have already sent the response
    throw new Error(
      'User is not defined in "Generate a new nonce for the user".'
    )
  }

  user.nonce = Math.floor(Math.random() * 10000).toString();
  userRepository.create(user);

  // Create JWT
  const token = await jwt.sign({ payload: {id: user.id, public_address} }, config.secret, { algorithm: config.algorithms[0]});
  if(!token) {
    res.status(400)
      .send('Empty token')
  }
};
