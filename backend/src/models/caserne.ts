import {Schema, model, Document} from 'mongoose';
import {IVehicule} from './vehicule';


export interface ICaserne extends Document{
    name: string,
    groupement: string,
    lattitude: number,
    longitude: number,
    effectifAct : number,
    maxEffectif: number,
    vehicules?: IVehicule[]

}

const caserneSchema = new Schema<ICaserne>({
    name: String,
    groupement: String,
    lattitude: Number,
    longitude: Number,
    effectifAct: Number,
    maxEffectif: Number,
    vehicules: ({type: Schema.Types.ObjectId, ref: 'Vehicule'})
})

export default model<ICaserne>('Caserne',caserneSchema);

