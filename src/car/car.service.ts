import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import CreateCarDto from './dto/createCar.dto';
import UpdateCarDto from './dto/updateCar.dto';
import { Car, CarDocument } from './schemas/car.schema';
import RemoveCarDto from './dto/removeCar.dto';

@Injectable()
export class CarService {
  constructor(@InjectModel(Car.name) private carModel: Model<CarDocument>) {}

  async createCar(dto?: CreateCarDto) {
    try {
      const newUser = new this.carModel({
        ...dto,
        carOwnerId: new ObjectId(dto.carOwnerId),
        createDateTime: new Date().toISOString(),
      });

      return await newUser.save();
    } catch (e) {
      throw new BadRequestException({ message: 'Failed to create new car' });
    }
  }

  async getAllCars() {
    return await this.carModel.find();
  }

  async getSingleCar(id: string) {
    try {
      return await this.carModel.findById(new ObjectId(id));
    } catch (e) {
      throw new BadRequestException({
        message: `Failed to get car with id=${id}`,
      });
    }
  }

  async updateCar(carId: string, dto?: UpdateCarDto) {
    try {
      return await this.carModel.findByIdAndUpdate(
        new ObjectId(carId),
        {
          ...dto,
          lastUpdateDateTime: new Date().toISOString(),
        },
        { new: true },
      );
    } catch (e) {
      throw new BadRequestException({
        message: `Failed to update car. Not Found carId={${carId}}`,
      });
    }
  }

  async deleteCar(dto: RemoveCarDto) {
    try {
      await this.carModel.updateMany(
        { _id: { $in: dto.carId } },
        { $set: { isDeleted: true } },
      );

      return 'Successfully removed';
    } catch (e) {
      throw new BadRequestException({
        message: `Failed to delete cars with "${dto.carId.join(',')}"`,
      });
    }
  }
}
