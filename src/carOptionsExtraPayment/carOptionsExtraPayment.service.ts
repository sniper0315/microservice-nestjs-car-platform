import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';

import DeleteCarOptionDto from 'src/carOptions/dto/deleteCarOption.dto';
import CreateCarExtraPaymentOptionDto from './dto/createCarExtraPaymentOption.dto';
import UpdateCarExtraPaymentOptionDto from './dto/updateCarExtraPaymentOption.dto';
import { CarOptionsExtraPayment, CarOptionsExtraPaymentDocument } from './schemas/carOptionsExtraPayment.schema';

@Injectable()
export default class CarOptionsExtraPaymentService {
    constructor(@InjectModel(CarOptionsExtraPayment.name) private carOptionsExtraPaymentModel: Model<CarOptionsExtraPaymentDocument>) {}

    async createCarExtraPaymentOption(dto?: CreateCarExtraPaymentOptionDto) {
        try {
            const newService = new this.carOptionsExtraPaymentModel({
                ...dto,
                carId: new ObjectId(dto.carId)
            });

            return await newService.save();
        } catch (e) {
            throw new BadRequestException({ message: e.originalStack });
        }
    }

    async getAllCarExtraPaymentOptions() {
        try {
            return await this.carOptionsExtraPaymentModel.find();
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
            return await this.carOptionsExtraPaymentModel.findOneAndUpdate(
                { _id: new ObjectId(carOptionId) },
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

    async deleteCarExtraPaymentOption(dto: DeleteCarOptionDto) {
        try {
            await this.carOptionsExtraPaymentModel.updateMany({ _id: { $in: dto.carOptionId } }, { $set: { isDeleted: true } });

            return 'Successfully removed';
        } catch (e) {
            throw new BadRequestException({ message: e.originalStack });
        }
    }
}
