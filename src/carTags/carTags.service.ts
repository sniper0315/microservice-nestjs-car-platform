import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';

import CreateCarTagDto from './dto/createCarTag.dto';
import DeleteCarTagDto from './dto/deleteCarTag.dto';
import UpdateCarTagDto from './dto/updateCarTag.dto';
import { CarTag, CarTagDocument } from './schemas/carTags.schema';

@Injectable()
export default class CarTagsService {
    constructor(@InjectModel(CarTag.name) private carTagModel: Model<CarTagDocument>) {}

    async createCarTag(dto?: CreateCarTagDto) {
        try {
            const newTag = new this.carTagModel({
                ...dto,
                carId: new ObjectId(dto.carId)
            });

            return await newTag.save();
        } catch (e) {
            throw new BadRequestException({ message: e.originalStack });
        }
    }

    async getAllCarTags() {
        try {
            return await this.carTagModel.find();
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
            return await this.carTagModel.findOneAndUpdate(
                { _id: new ObjectId(carTagId) },
                {
                    ...dto,
                    lastUpdateDateTime: new Date().toISOString()
                },
                { new: true },
                function (err, model) {
                    if (model) return model;
                    else return new Error(err.message);
                }
            );
        } catch (e) {
            throw new BadRequestException({ message: e.originalStack });
        }
    }

    async deleteCarTag(dto: DeleteCarTagDto) {
        try {
            await this.carTagModel.updateMany({ _id: { $in: dto.carTagId } }, { $set: { isDeleted: true } });

            return 'Successfully removed';
        } catch (e) {
            throw new BadRequestException({ message: e.originalStack });
        }
    }
}
