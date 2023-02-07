import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

import CreateCarDto from './dto/createCar.dto';
import UpdateCarDto from './dto/updateCar.dto';
import DeleteCarDto from './dto/deleteCar.dto';
import { Car, CarDocument } from './schemas/car.schema';

@Injectable()
export default class CarService {
    constructor(@InjectModel(Car.name) private carModel: Model<CarDocument>) {}

    async createCar(dto?: CreateCarDto) {
        try {
            const newCar = new this.carModel({
                ...dto,
                carOwnerId: new ObjectId(dto.carOwnerId)
            });

            return await newCar.save();
        } catch (e) {
            throw new BadRequestException({ message: e.originalStack });
        }
    }

    async getAllCars() {
        try {
            return await this.carModel.find();
        } catch (e) {
            throw new BadRequestException({ message: e.originalStack });
        }
    }

    async getSingleCar(carId: string) {
        try {
            return await this.carModel.findById(new ObjectId(carId));
        } catch (e) {
            throw new BadRequestException({ message: e.originalStack });
        }
    }

    async updateCar(carId: string, dto?: UpdateCarDto) {
        try {
            return await this.carModel.findOneAndUpdate(
                { _id: new ObjectId(carId) },
                {
                    ...dto,
                    lastUpdateDateTime: new Date().toISOString()
                },
                { new: true },
                function (err, model) {
                    if (model) return model;
                    else throw new BadRequestException({ message: `Not found with ${carId}. Please input id correctly.` });
                }
            );
        } catch (e) {
            throw new BadRequestException({ message: e.originalStack });
        }
    }

    async deleteCar(dto: DeleteCarDto) {
        try {
            await this.carModel.updateMany({ _id: { $in: dto.carId } }, { $set: { isDeleted: true } });

            return 'Successfully removed';
        } catch (e) {
            throw new BadRequestException({ message: e.originalStack });
        }
    }
}
