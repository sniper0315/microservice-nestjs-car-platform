import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';

import CreateCarTagDto from './dto/createCarTag.dto';
import DeleteCarTagDto from './dto/deleteCarTag.dto';
import GetAllCarTagsDto from './dto/getAll.dto';
import UpdateCarTagDto from './dto/updateCarTag.dto';
import { CarTag, CarTagDocument } from './schemas/carTags.schema';

@Injectable()
export default class CarTagsService {
    constructor(@InjectModel(CarTag.name) private carTagModel: Model<CarTagDocument>) {}

    async createCarTag(dto?: CreateCarTagDto) {
        try {
            return await (await this.carTagModel.create({ ...dto, carId: new ObjectId(dto.carId) })).save({ timestamps: false });
        } catch (e) {
            throw new BadRequestException({ message: e.originalStack });
        }
    }

    async getAllCarTags(dto?: GetAllCarTagsDto) {
        try {
            const sortBy = dto.metaInfo.sortBy;
            const sortDirection = dto.metaInfo.sortDirection.toLowerCase();
            let sortObject = {};

            sortObject[sortBy] = sortDirection;

            return await this.carTagModel
                .find({
                    createDateTime: { $gte: dto.dateTime.createdDateTimeFrom, $lte: dto.dateTime.createdDateTimeTo },
                    $or: [
                        { carId: dto.carId === '' ? null : new ObjectId(dto.carId) },
                        { tagName: dto.tagName },
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

    async getSingleCarTag(carTagId: string) {
        try {
            return await this.carTagModel.findById(new ObjectId(carTagId));
        } catch (e) {
            throw new BadRequestException({ message: e.originalStack });
        }
    }

    async updateCarTag(carTagId: string, dto?: UpdateCarTagDto) {
        try {
            return await this.carTagModel
                .findOneAndUpdate(
                    { _id: new ObjectId(carTagId) },
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

    async deleteCarTag(dto: DeleteCarTagDto) {
        try {
            return await this.carTagModel.updateMany({ _id: { $in: dto.carTagId } }, { $set: { isDeleted: true } }, { timestamps: false });
        } catch (e) {
            throw new BadRequestException({ message: e.originalStack });
        }
    }
}
