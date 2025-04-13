import {Schema, model, Document, Types} from 'mongoose';

export interface IVehicule extends Document {
    type: string,
    statut: string,
    caserneId: Types.ObjectId;
}

const vehiculeSchema = new Schema<IVehicule>({
    type: String,
    statut: String,
    caserneId : {type: Schema.Types.ObjectId, ref: 'Caserne'}
});


export default model<IVehicule>('Vehicule', vehiculeSchema);