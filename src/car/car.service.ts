import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Response } from 'express';

import CreateCarDto from './dto/createCar.dto';
import UpdateCarDto from './dto/updateCar.dto';
import DeleteCarDto from './dto/deleteCar.dto';
import { Car, CarDocument } from './schemas/car.schema';
import GetAllCarsDto from './dto/getAll.dto';

@Injectable()
export default class CarService {
    constructor(@InjectModel(Car.name) private carModel: Model<CarDocument>) {}

    async createCar(dto?: CreateCarDto) {
        try {
            return await (await this.carModel.create({ ...dto, carOwnerId: new ObjectId(dto.carOwnerId) })).save({ timestamps: false });
        } catch (e) {
            throw new BadRequestException({ message: e.originalStack });
        }
    }

    async getAllCars(dto?: GetAllCarsDto) {
        try {
            const sortBy = dto.metaInfo.sortBy;
            const sortDirection = dto.metaInfo.sortDirection.toLowerCase();
            let sortObject = {};

            sortObject[sortBy] = sortDirection;

            return await this.carModel
                .find({
                    createDateTime: { $gte: dto.dateTime.createdDateTimeFrom, $lte: dto.dateTime.createdDateTimeTo },
                    $or: [
                        { _id: dto.id === '' ? null : new ObjectId(dto.id) },
                        { produceCompany: dto.produceCompany },
                        { carModel: dto.carModel },
                        { produceYear: dto.produceYear },
                        { seats: dto.seats },
                        { color: dto.color },
                        { doors: dto.doors },
                        { fuelType: dto.fuelType },
                        { luggage: dto.luggage },
                        { carType: dto.carType },
                        { transmission: dto.transmission },
                        { carOwnerId: dto.carOwnerId === '' ? null : new ObjectId(dto.carOwnerId) },
                        { isActive: dto.isActive },
                        { isDeleted: dto.isDeleted },
                        { lastUpdateDateTime: { $eq: '' } },
                        { $and: [{ lastUpdateDateTime: { $ne: '' } }, { lastUpdateDateTime: { $gte: dto.dateTime.lastUpdateDateTimeFrom, $lte: dto.dateTime.lastUpdateDateTimeTo } }] }
                    ]
                })
                .sort(sortObject)
                .skip(dto.metaInfo.offset)
                .limit(dto.metaInfo.limit);
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
            return await this.carModel
                .findOneAndUpdate(
                    { _id: new ObjectId(carId) },
                    {
                        ...dto,
                        lastUpdateDateTime: new Date().toISOString()
                    },
                    { new: true, timestamps: false },
                    function (err, model) {
                        if (model) return model;
                        else return false;
                    }
                )
                .clone()
                .catch(function (err) {
                    throw new BadRequestException({ message: err });
                });
        } catch (e) {
            throw new BadRequestException({ message: e.originalStack });
        }
    }

    async deleteCar(dto: DeleteCarDto) {
        try {
            return await this.carModel.updateMany({ _id: { $in: dto.carId } }, { $set: { isDeleted: true } }, { timestamps: false });
        } catch (e) {
            throw new BadRequestException({ message: e.originalStack });
        }
    }
}
