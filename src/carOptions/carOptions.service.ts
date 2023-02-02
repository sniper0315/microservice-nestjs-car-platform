import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';

import CreateCarOptionDto from './dto/createCarOption.dto';
import DeleteCarOptionDto from './dto/deleteCarOption.dto';
import UpdateCarOptionDto from './dto/updateCarOption.dto';
import { CarOption, CarOptionDocument } from './schemas/carOptions.schema';

@Injectable()
export default class CarOptionsService {
    constructor(@InjectModel(CarOption.name) private carOptionsModel: Model<CarOptionDocument>) {}

    async createCarOption(dto?: CreateCarOptionDto) {
        try {
            const newService = new this.carOptionsModel({
                ...dto,
                carId: new ObjectId(dto.carId)
            });

            return await newService.save();
        } catch (e) {
            throw new BadRequestException({ message: 'Failed to create new car option.' });
        }
    }

    async getAllCarOptions() {
        try {
            return await this.carOptionsModel.find();
        } catch (e) {
            throw new BadRequestException({ message: 'Failed to get all car options.' });
        }
    }

    async getSingleCarOption(carOptionId: string) {
        try {
            return await this.carOptionsModel.findById(new ObjectId(carOptionId));
        } catch (e) {
            throw new BadRequestException({ message: `Failed to get car option with id=${carOptionId}` });
        }
    }

    async updateCarOption(carOptionId: string, dto?: UpdateCarOptionDto) {
        try {
            return await this.carOptionsModel.findByIdAndUpdate(
                new ObjectId(carOptionId),
                {
                    ...dto,
                    lastUpdateDateTime: new Date().toISOString()
                },
                { new: true }
            );
        } catch (e) {
            throw new BadRequestException({ message: `Failed to update car option. Not Found carOptionId={${carOptionId}}` });
        }
    }

    async deleteCarOption(dto: DeleteCarOptionDto) {
        try {
            await this.carOptionsModel.updateMany({ _id: { $in: dto.carOptionId } }, { $set: { isDeleted: true } });

            return 'Successfully removed';
        } catch (e) {
            throw new BadRequestException({ message: `Failed to delete car options with "${dto.carOptionId.join(',')}"` });
        }
    }
}
