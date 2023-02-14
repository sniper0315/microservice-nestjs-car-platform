import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';

import CreateCarOptionDto from './dto/createCarOption.dto';
import DeleteCarOptionDto from './dto/deleteCarOption.dto';
import GetAllCarOptionsDto from './dto/getAll.dto';
import UpdateCarOptionDto from './dto/updateCarOption.dto';
import { CarOption, CarOptionDocument } from './schemas/carOptions.schema';

@Injectable()
export default class CarOptionsService {
    constructor(@InjectModel(CarOption.name) private carOptionsModel: Model<CarOptionDocument>) {}

    async createCarOption(dto?: CreateCarOptionDto) {
        try {
            return await (await this.carOptionsModel.create({ ...dto, carId: new ObjectId(dto.carId) })).save({ timestamps: false });
        } catch (e) {
            throw new BadRequestException({ message: e.originalStack });
        }
    }

    async getAllCarOptions(dto?: GetAllCarOptionsDto) {
        try {
            const sortBy = dto.metaInfo.sortBy;
            const sortDirection = dto.metaInfo.sortDirection.toLowerCase();
            let sortObject = {};

            sortObject[sortBy] = sortDirection;

            return await this.carOptionsModel
                .find({
                    createDateTime: { $gte: dto.dateTime.createdDateTimeFrom, $lte: dto.dateTime.createdDateTimeTo },
                    $or: [
                        { carId: dto.carId === '' ? null : new ObjectId(dto.carId) },
                        { optionType: dto.optionType },
                        { optionDescription: dto.optionDescription },
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

    async getSingleCarOption(carOptionId: string) {
        try {
            return await this.carOptionsModel.findById(new ObjectId(carOptionId));
        } catch (e) {
            throw new BadRequestException({ message: e.originalStack });
        }
    }

    async updateCarOption(carOptionId: string, dto?: UpdateCarOptionDto) {
        try {
            return await this.carOptionsModel
                .findOneAndUpdate(
                    { _id: new ObjectId(carOptionId) },
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

    async deleteCarOption(dto: DeleteCarOptionDto) {
        try {
            return await this.carOptionsModel.updateMany({ _id: { $in: dto.carOptionId } }, { $set: { isDeleted: true } }, { timestamps: false });
        } catch (e) {
            throw new BadRequestException({ message: e.originalStack });
        }
    }
}
