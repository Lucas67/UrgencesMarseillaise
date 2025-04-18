
import { Pompier } from '../core/Pompier';

export async function getProfile(name: string): Promise<Pompier | null> {
  const doc  = await UserModel.findOne({username: name});
  if (!doc) return null;

  return new Pompier(doc)
}

export async function changerStatus(name: string, newStatus: string): Promise<boolean> {
    const doc = await UserModel.findOne({username: name})
    
    if(!doc) {
        return false;
    }

    const pompier = new Pompier(doc);
    pompier.changerStatus(newStatus);
    await pompier.save();

    return true;
}

export default {
    getProfile,
    changerStatus
}
