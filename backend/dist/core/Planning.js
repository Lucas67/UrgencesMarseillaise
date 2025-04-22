"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Planning = exports.statusPompier = void 0;
var statusPompier;
(function (statusPompier) {
    statusPompier["AuRepos"] = "Au repos";
    statusPompier["Astreinte"] = "Astreinte";
    statusPompier["Garde"] = "Garde";
})(statusPompier || (exports.statusPompier = statusPompier = {}));
class Planning {
    constructor(pompierId, annee, nrSemaine) {
        this._pompierId = pompierId;
        this._annee = annee;
        this._nrSemaine = nrSemaine;
        this._planningSlots = {}; // ✅ Un objet vide au départ
        this._planningDebloque = false;
    }
    get pompierId() {
        return this._pompierId;
    }
    set pompierId(value) {
        this._pompierId = value;
    }
    get annee() {
        return this._annee;
    }
    set annee(value) {
        this._annee = value;
    }
    get nrSemaine() {
        return this._nrSemaine;
    }
    set nrSemaine(value) {
        this._nrSemaine = value;
    }
    get planningSlots() {
        return this._planningSlots; // ✅ Retourner l'objet, pas []
    }
    set planningSlots(value) {
        this._planningSlots = value;
    }
    get planningDebloque() {
        return this._planningDebloque;
    }
    set planningDebloque(value) {
        this._planningDebloque = value;
    }
    debloquerPlanning() {
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
    afficherPlanning() {
        if (!this._planningDebloque) {
            throw new Error("Le planning n'est pas débloqué.");
        }
        return this._planningSlots;
    }
    AjouterHeure(jour, heure, status) {
        const slot = this._planningSlots[jour].find(slot => slot.hour === heure);
        if (!slot) {
            throw new Error(`L'heure ${heure} n'existe pas pour le jour ${jour}.`);
        }
        slot.status = status;
    }
    RetirerHeure(jour, heure) {
        const slot = this._planningSlots[jour].find(slot => slot.hour === heure);
        if (!slot) {
            throw new Error(`L'heure ${heure} n'existe pas pour le jour ${jour}.`);
        }
        slot.status = statusPompier.AuRepos; // Remettre à "Au repos"
    }
    static importFromJSON(data) {
        const planning = new Planning(data.pompierId, data.annee, data.nrSemaine);
        planning.planningDebloque = data.planningDebloque;
        planning.planningSlots = data.planningSlots; // ✅ Assigner l'objet directement
        return planning;
    }
}
exports.Planning = Planning;
exports.default = Planning;
