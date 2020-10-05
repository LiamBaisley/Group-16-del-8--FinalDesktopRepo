import { Child } from './child';
import { MedicalAidInfo } from './medical-aid-info';
import { Parent } from './parent';
import { PickUpPerson } from './pick-up-person';
import { EmergencyContact } from './emergency-contact';
import { Allergy } from './allergy';
import { Vaccine } from './vaccine';
import { InfectiousDisease } from './infectious-disease';

export class RegistrationModel {
    public newChild: Child = new Child();
    public medAid: MedicalAidInfo = new MedicalAidInfo;
    public Mother: Parent = new Parent();
    public Father: Parent = new Parent();
    public PUPOne: PickUpPerson = new PickUpPerson;
    public PUPTwo: PickUpPerson = new PickUpPerson;
    public ECOne: EmergencyContact= new EmergencyContact();
    public ECTwo: EmergencyContact= new EmergencyContact();
    public Grade: string ="";
    public PackageID: number =0;
    public RegistrationDate: Date =  new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    public Allergies: Allergy[] = [];
    public Vaccines: Vaccine[] = [];
    public InfectiousDiseases: InfectiousDisease[] = [];
}
