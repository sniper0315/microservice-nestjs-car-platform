import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';

import CreateCarServiceDto from './dto/createCarService.dto';
import DeleteCarServiceDto from './dto/deleteCarService.dto';
import UpdateCarServiceDto from './dto/updateCarService.dto';
import { CarService, CarServiceDocument } from './schemas/carService.schema';

@Injectable()
export default class CarServiceService {
    constructor(@InjectModel(CarService.name) private carServiceModel: Model<CarServiceDocument>) {}

    async createCarService(dto?: CreateCarServiceDto) {
        try {
            const newService = new this.carServiceModel({
                ...dto,
                carId: new ObjectId(dto.carId),
                employeeId: new ObjectId(dto.employeeId)
            });

            return await newService.save();
        } catch (e) {
            throw new BadRequestException({ message: 'Failed to create new car service' });
        }
    }

    async getAllCarServices() {
        try {
            return await this.carServiceModel.find();
        } catch (e) {
            throw new BadRequestException({ message: 'Failed to get all car services.' });
        }
    }

    async getSingleCarService(carServiceId: string) {
        try {
            return await this.carServiceModel.findById(new ObjectId(carServiceId));
        } catch (e) {
            throw new BadRequestException({ message: `Failed to get car service with id=${carServiceId}` });
        }
    }

    async updateCarService(serviceId: string, dto?: UpdateCarServiceDto) {
        try {
            return await this.carServiceModel.findByIdAndUpdate(
                new ObjectId(serviceId),
                {
                    ...dto,
                    lastUpdateDateTime: new Date().toISOString()
                },
                { new: true }
            );
        } catch (e) {
            throw new BadRequestException({ message: `Failed to update car service. Not Found carServiceId={${serviceId}}` });
        }
    }

    async deleteCarService(dto: DeleteCarServiceDto) {
        try {
            await this.carServiceModel.updateMany({ _id: { $in: dto.carServiceId } }, { $set: { isDeleted: true } });

            return 'Successfully removed';
        } catch (e) {
            throw new BadRequestException({ message: `Failed to delete car services with "${dto.carServiceId.join(',')}"` });
        }
    }
}
