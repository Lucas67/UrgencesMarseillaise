export class Vehicule {
    private _id: number;
    private _type: string;
    private _statut: string;
    private _latitude: number;
    private _longitude: number;
    private _caserneId: number;
  
    constructor(type: string, caserneId: number) {
      this._id = 0;
      this._type = type;
      this._statut = "disponible"; // Par défaut
      this._latitude = 0;
      this._longitude = 0;
      this._caserneId = caserneId;
    }
  
    // Getters
    get id(): number {
      return this._id;
    }  
    get type(): string {
      return this._type;
    }
  
    get statut(): string {
      return this._statut;
    }
  
    get latitude(): number {
      return this._latitude;
    }
  
    get longitude(): number {
      return this._longitude;
    }
  
    get caserneId(): number {
      return this._caserneId;
    }
  
    // Setters
    set id(id: number) {
      this._id = id;
    }
    set type(type: string) {
      this._type = type;
    }
  
    set statut(statut: string) {
      this._statut = statut;
    }
  
    set latitude(latitude: number) {
      this._latitude = latitude;
    }
  
    set longitude(longitude: number) {
      this._longitude = longitude;
    }
  
    set caserneId(caserneId: number) {
      this._caserneId = caserneId;
    }
  }

  export default Vehicule;
  