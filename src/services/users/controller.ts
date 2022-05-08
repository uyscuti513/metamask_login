import { NextFunction, Request, Response } from "express";
import { User } from "../../entity/User";
import { AppDataSource } from "../../db";
import { AuthorizationError } from '../../errors/AuthorizationsError';

export const findByAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userRepository = await AppDataSource.getRepository(User);
    const address = (req.query as any).address;
    const data = await userRepository.find({
      where: { public_address: address },
    });
    if (!data.length) {
      throw new Error(`No find users with ${address} address`);
    }
    res.status(200).json({
      success: true,
      detail: `Users with ${address} address`,
      users: data,
    });
  } catch (error: any) {
    res.status(400).json(error.message);
  }
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userRepository = await AppDataSource.getRepository(User);
    const id = req.body.user.payload.id;
    const user = await userRepository.find({
      where: {
        id,
      },
    });
    console.log(id !== req.params.userId);
    if (id !== req.params.userId) {
      return res
        .status(401)
        .send({ error: "You can can only access yourself" });
    }
    return res.status(200).json(user);
  } catch (error: any) {
    console.log(`Could not find the publicAddress`);
    console.log(error);
    res.status(500).json({
      error,
    });
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userRepository = await AppDataSource.getRepository(User);
    const body = req.body;
    const createdUser = await userRepository.save(body);

    return res.status(200).json({
      success: true,
      detail: `user created successfully`,
      user: createdUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
    });
  }
};

export const patch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Only allow to fetch current user
  try {
    const userRepository = await AppDataSource.getRepository(User);
    const id = req.params.id;
    const newBody = req.body;

    const user = await userRepository.findOneBy({
        id,
    });

    if (user == null) {
      return res
        .status(204)
        .json({
          success: true,
          detail: `Could not find user with id ${id}`
        })
    }

    const editedUser = await userRepository.update(id, newBody);

    return res.status(200).json({
      success: true,
      detail: `User id ${id} update correctly`,
      data: editedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error,
    });
  }
};
