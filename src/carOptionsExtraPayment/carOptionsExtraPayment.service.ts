import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';

import DeleteCarOptionDto from 'src/carOptions/dto/deleteCarOption.dto';
import CreateCarExtraPaymentOptionDto from './dto/createCarExtraPaymentOption.dto';
import GetAllDto from './dto/getAll.dto';
import UpdateCarExtraPaymentOptionDto from './dto/updateCarExtraPaymentOption.dto';
import { CarOptionsExtraPayment, CarOptionsExtraPaymentDocument } from './schemas/carOptionsExtraPayment.schema';

@Injectable()
export default class CarOptionsExtraPaymentService {
    constructor(@InjectModel(CarOptionsExtraPayment.name) private carOptionsExtraPaymentModel: Model<CarOptionsExtraPaymentDocument>) {}

    async createCarExtraPaymentOption(dto?: CreateCarExtraPaymentOptionDto) {
        try {
            return await (await this.carOptionsExtraPaymentModel.create({ ...dto, carId: new ObjectId(dto.carId) })).save({ timestamps: false });
        } catch (e) {
            throw new BadRequestException({ message: e.originalStack });
        }
    }

    async getAllCarExtraPaymentOptions(dto?: GetAllDto) {
        try {
            const sortBy = dto.metaInfo.sortBy;
            const sortDirection = dto.metaInfo.sortDirection.toLowerCase();
            let sortObject = {};

            sortObject[sortBy] = sortDirection;

            return await this.carOptionsExtraPaymentModel
                .find({
                    createDateTime: { $gte: dto.dateTime.createdDateTimeFrom, $lte: dto.dateTime.createdDateTimeTo },
                    price: { $gte: dto.priceFrom ? dto.priceFrom : 0, $lte: dto.priceTo ? dto.priceTo : Infinity },
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

    async getSingleCarExtraPaymentOption(carOptionId: string) {
        try {
            return await this.carOptionsExtraPaymentModel.findById(new ObjectId(carOptionId));
        } catch (e) {
            throw new BadRequestException({ message: e.originalStack });
        }
    }

    async updateCarExtraPaymentOption(carOptionId: string, dto?: UpdateCarExtraPaymentOptionDto) {
        try {
            return await this.carOptionsExtraPaymentModel
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

    async deleteCarExtraPaymentOption(dto: DeleteCarOptionDto) {
        try {
            return await this.carOptionsExtraPaymentModel.updateMany({ _id: { $in: dto.carOptionId } }, { $set: { isDeleted: true } }, { timestamps: false });
        } catch (e) {
            throw new BadRequestException({ message: e.originalStack });
        }
    }
}
