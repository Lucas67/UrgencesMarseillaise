export enum statusPompier  {
    AuRepos = 'Au repos',
    Astreinte = 'Astreinte',
    Garde = 'Garde'
}
type PlanningSlot = {
    hour: number;
    status: statusPompier;
};

type PlanningSemaine = {
    [jour: string]: PlanningSlot[];
};

export class Planning {
    private _pompierId: number;
    private _annee: number;
    private _nrSemaine: number;
    private _planningSlots: PlanningSemaine; // ✅ PAS [] !
    private _planningDebloque: boolean;

    constructor(pompierId: number, annee: number, nrSemaine: number) {
        this._pompierId = pompierId;
        this._annee = annee;
        this._nrSemaine = nrSemaine;
        this._planningSlots = {}; // ✅ Un objet vide au départ
        this._planningDebloque = false;
    }

    get pompierId(): number {
        return this._pompierId;
    }
    
    set pompierId(value: number) {
        this._pompierId = value;
    }
    
    get annee(): number {
        return this._annee;
    }
    
    set annee(value: number) {
        this._annee = value;
    }
    
    get nrSemaine(): number {
        return this._nrSemaine;
    }
    
    set nrSemaine(value: number) {
        this._nrSemaine = value;
    }
    
    get planningSlots(): PlanningSemaine {
        return this._planningSlots; // ✅ Retourner l'objet, pas []
    }
    
    set planningSlots(value: PlanningSemaine) {
        this._planningSlots = value;
    }
    
    get planningDebloque(): boolean {
        return this._planningDebloque;
    }
    
    set planningDebloque(value: boolean) {
        this._planningDebloque = value;
    }

    public debloquerPlanning(): void {
        if (this._planningDebloque) {
            throw new Error("Le planning est déjà débloqué.");
        }

        const joursSemaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

        for (const jour of joursSemaine) {
            this._planningSlots[jour] = [];

            for (let hour = 0; hour < 24; hour++) {
                this._planningSlots[jour].push({
                    hour: hour,
                    status: statusPompier.AuRepos 
                });
            }
        }

        this._planningDebloque = true; // ✅ Une seule fois à la fin
    }

    public afficherPlanning(): PlanningSemaine {
        if (!this._planningDebloque) {
            throw new Error("Le planning n'est pas débloqué.");
        }
        return this._planningSlots;
    }

    public AjouterHeure(jour:string, heure:number, status:statusPompier):void {

        const slot = this._planningSlots[jour].find(slot => slot.hour === heure);

        if (!slot) {
            throw new Error(`L'heure ${heure} n'existe pas pour le jour ${jour}.`);
        }
    
        slot.status = status;
        }

    public RetirerHeure(jour:string,heure:number):void {

        const slot = this._planningSlots[jour].find(slot => slot.hour === heure);

        if (!slot) {
            throw new Error(`L'heure ${heure} n'existe pas pour le jour ${jour}.`);
        }
    
        slot.status = statusPompier.AuRepos; // Remettre à "Au repos"
    }

    static importFromJSON(data: any):Planning {
        const planning = new Planning(data.pompierId,data.annee,data.nrSemaine);
        planning.planningDebloque = data.planningDebloque;
        planning.planningSlots = data.planningSlots; // ✅ Assigner l'objet directement
        return planning;
    }

}


export default Planning;
