import CaserneModel from '../models/caserne';
import UserModel from '../models/user';
import {ICaserne} from '../models/caserne';
import { IVehicule } from '../models/vehicule';

const MAX_EFFECTIF = 45;

export async function getVehiculeCaserne(name: string): Promise<IVehicule[]> {
  const caserne = await CaserneModel
    .findById(name)
    .populate<{ vehicules: IVehicule[] }>('vehicules')
    .exec();

  if (!caserne || !caserne.vehicules) {
    return [];
  }

  return caserne.vehicules;
}

export async function getCaserneMiniEffectif(): Promise<ICaserne> {

  const caserne = await CaserneModel.find();

  const caserneAcvecEffectif = await Promise.all(
    caserne.map(async(caserne) => {
      const count = await UserModel.countDocuments({caserneName: caserne.name});
      return {caserne, count};
    })
  );

  const caserneDispo = caserneAcvecEffectif.filter(effectif => effectif.count < MAX_EFFECTIF);

  const caserneMiniEffectif = caserneDispo.sort((a,b) => a.count - b.count)[0];

  return caserneMiniEffectif.caserne;

}


export default {
    getVehiculeCaserne,
    getCaserneMiniEffectif
}