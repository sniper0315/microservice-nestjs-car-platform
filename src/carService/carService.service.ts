import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';

import CreateCarServiceDto from './dto/createCarService.dto';
import DeleteCarServiceDto from './dto/deleteCarService.dto';
import GetAllCarServicesDto from './dto/getAll.dto';
import UpdateCarServiceDto from './dto/updateCarService.dto';
import { CarService, CarServiceDocument } from './schemas/carService.schema';

@Injectable()
export default class CarServiceService {
    constructor(@InjectModel(CarService.name) private carServiceModel: Model<CarServiceDocument>) {}

    async createCarService(dto?: CreateCarServiceDto) {
        try {
            return await (
                await this.carServiceModel.create({
                    ...dto,
                    carId: new ObjectId(dto.carId),
                    employeeId: new ObjectId(dto.employeeId)
                })
            ).save({ timestamps: false });
        } catch (e) {
            throw new BadRequestException({ message: e.originalStack });
        }
    }

    async getAllCarServices(dto?: GetAllCarServicesDto) {
        try {
            const sortBy = dto.metaInfo.sortBy;
            const sortDirection = dto.metaInfo.sortDirection.toLowerCase();
            let sortObject = {};

            sortObject[sortBy] = sortDirection;

            return await this.carServiceModel
                .find({
                    createDateTime: { $gte: dto.dateTime.createdDateTimeFrom, $lte: dto.dateTime.createdDateTimeTo },
                    price: { $gte: dto.priceFrom ? dto.priceFrom : 0, $lte: dto.priceTo ? dto.priceTo : Infinity },
                    $or: [
                        { _id: dto.id === '' ? null : new ObjectId(dto.id) },
                        { carId: dto.carId === '' ? null : new ObjectId(dto.carId) },
                        { status: dto.status },
                        { employeeId: dto.employeeId === '' ? null : new ObjectId(dto.employeeId) },
                        { serviceType: dto.serviceType },
                        { serviceComment: dto.serviceComment },
                        { serviceCompany: dto.serviceCompany },
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

    async getSingleCarService(carServiceId: string) {
        try {
            return await this.carServiceModel.findById(new ObjectId(carServiceId));
        } catch (e) {
            throw new BadRequestException({ message: e.originalStack });
        }
    }

    async updateCarService(carServiceId: string, dto?: UpdateCarServiceDto) {
        try {
            return await this.carServiceModel
                .findOneAndUpdate(
                    { _id: new ObjectId(carServiceId) },
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

    async deleteCarService(dto: DeleteCarServiceDto) {
        try {
            return await this.carServiceModel.updateMany({ _id: { $in: dto.carServiceId } }, { $set: { isDeleted: true } }, { timestamps: false });
        } catch (e) {
            throw new BadRequestException({ message: e.originalStack });
        }
    }
}
