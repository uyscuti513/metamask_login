import { NextFunction, Request, Response } from "express";
import { User } from "../../entity/User";
import { AppDataSource } from "../../db";
import { Equal } from "typeorm";

export const findAdress = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const userRepository = await AppDataSource.getRepository(User);
    const address = (req.query as any).address;
    const data = await userRepository.find({
      where: { publicAddress: address },
    });
    console.log(data),
    console.log(address)
    res.status(200).json(
      data
    );
  } catch (error) {
    console.log(`Could not find the publicAddress`);
    res.status(500).json({
      error,
    });
  }
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userRepository = await AppDataSource.getRepository(User);
    const body = req.body;
    if (body.user.payload.id !== +req.params.userId) {
      return res
        .status(401)
        .send({ error: "You can can only access yourself" });
    }
    const user = await userRepository.findBy({
      id: Equal(body.user.payload.id),
    });
    return res.status(200).json(user);
  } catch (error) {
    console.log(`Could not find the publicAddress`);
    res.status(500).json({
      error,
    });
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userRepository = await AppDataSource.getRepository(User);
		const body = req.body;
		const createdUser = await userRepository.create(body);
		return res
			.status(200)
			.json(createdUser);
	} catch (error) {
		console.log(`Could not create the user`);
		res.status(500).json({
		  error,
		});
	}
}

export const patch = async (req: Request, res: Response, next: NextFunction) => {
  // Only allow to fetch current user
	try {
		const body = req.body;
		const userId = Number(req.params.userId);
		if ((req as any).user.payload.id !== +req.params.userId) {
			return res.status(401).send({ error: "You can can only access yourself" });
		  }

		const result = await AppDataSource
		.createQueryBuilder()
		.update(User)
		.set( body )
		.where("id = :id", { id: userId })
		.execute()

	} catch (error) {
		console.log(error);
		res.status(500).json({
		  error,
		});
	}
};
