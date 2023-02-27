import mongoose from 'mongoose';
import { LocalityCreation } from '@/utils/types/locality.types';
import ILocality from '@/resources/locality/locality.interface';

export const mockCreateLocality: LocalityCreation = {
    name: 'Bacioi',
    deliveryCost: 80,
};

export const mockUpdateLocality: ILocality = {
    _id: new mongoose.Types.ObjectId('636696436a91a2dd0a0e3de0'),
    name: 'Stauceni',
    deliveryCost: 100,
};

export const mockNonExistingLocality: ILocality = {
    _id: new mongoose.Types.ObjectId('636696436a91a2dd0a0e3d21'),
    name: 'Stauceni',
    deliveryCost: 100,
};
