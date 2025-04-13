import {Schema, model, Document} from 'mongoose';


export interface ICaserne extends Document{
    name: string,
    groupement: string,
    lattitude: number,
    longitude: number,
    effectifAct : number,
    maxEffectif: number,

}

const caserneSchema = new Schema<ICaserne>({
    name: String,
    groupement: String,
    lattitude: Number,
    longitude: Number,
    effectifAct: Number,
    maxEffectif: Number
})

export default model<ICaserne>('Caserne',caserneSchema);

