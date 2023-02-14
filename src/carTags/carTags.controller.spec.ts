import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';

import CarTagsController from './carTags.controller';
import CarTagsService from './carTags.service';

import CreateCarTagDto from './dto/createCarTag.dto';
import DeleteCarTagDto from './dto/deleteCarTag.dto';
import GetAllDto from './dto/getAll.dto';
import UpdateCarTagDto from './dto/updateCarTag.dto';

describe('CarTagsController', () => {
    let carTagsController: CarTagsController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [CarTagsController],
            providers: [
                {
                    provide: CarTagsService,
                    useValue: {
                        createCarTag: jest.fn(),
                        getAllCarTags: jest.fn(),
                        getSingleCarTag: jest.fn(),
                        updateCarTag: jest.fn(),
                        deleteCarTag: jest.fn()
                    }
                }
            ]
        }).compile();

        carTagsController = app.get<CarTagsController>(CarTagsController);
    });

    describe('createCarTag', () => {
        it('should create new car tag', async () => {
            const dto: CreateCarTagDto = {
                carId: '61dc2d31bbe643fc32022a5f',
                tagName: {
                    value: 'Electro',
                    display: 'Electro'
                }
            };

            expect(await carTagsController.createCarTag(dto)).not.toEqual(null);
        });
    });

    describe('getAllCarTags', () => {
        it('should return an array of car tags', async () => {
            const dto: GetAllDto = {
                carId: '',
                tagName: {
                    value: '',
                    display: ''
                },
                dateTime: {
                    createdDateTimeFrom: '2023-02-03T22:08:48.758Z',
                    createdDateTimeTo: '2023-02-11T00:08:48.758Z',
                    lastUpdateDateTimeFrom: '2023-02-03T23:08:48.758Z',
                    lastUpdateDateTimeTo: '2023-02-04T23:08:48.758Z'
                },
                metaInfo: {
                    sortBy: 'createDateTime',
                    sortDirection: 'desc',
                    offset: 0,
                    limit: 10
                }
            };

            expect(await carTagsController.getAllCarTags(dto)).not.toEqual(null);
        });
    });

    describe('getSingleCarTag', () => {
        it('should return car tag', async () => {
            const id = '63dd973770f95d7f8883c73a';

            expect(await carTagsController.getSingleCarTag(id)).not.toEqual(null);
        });
    });

    describe('updateCarTag', () => {
        it('should update certain car tag', async () => {
            const id = '63dd973770f95d7f8883c73a';
            const dto: UpdateCarTagDto = {
                carId: '61dc2d31bbe643fc32022a5f',
                tagName: {
                    value: '',
                    display: ''
                },
                isDeleted: false
            };

            expect(await carTagsController.updateCarTag(id, dto)).not.toEqual(null);
        });
    });

    describe('deleteCarTag', () => {
        it('should delete car tags', async () => {
            const dto: DeleteCarTagDto = {
                carTagId: ['63dd973770f95d7f8883c73a']
            };
            const response = { json: {} };

            expect(await carTagsController.deleteCarTag(dto)).toBe('Successfully removed');
        });
    });
});
