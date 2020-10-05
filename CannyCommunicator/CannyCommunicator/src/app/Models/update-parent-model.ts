import { Child } from './child';
import { MedicalAidInfo } from './medical-aid-info';
import { Parent } from './parent';
import { PickUpPerson } from './pick-up-person';
import { EmergencyContact } from './emergency-contact';
import { Allergy } from './allergy';
import { Vaccine } from './vaccine';
import { InfectiousDisease } from './infectious-disease';
import { ClassGrade } from './class-grade';
import { Package } from './package';

export class UpdateParentModel {
    public newChild: Child = new Child();
    public medAid: MedicalAidInfo = new MedicalAidInfo();
    public Parent1: Parent = new Parent();
    public Parent2: Parent = new Parent();
    public PUP1: PickUpPerson = new PickUpPerson();
    public PUP2: PickUpPerson = new PickUpPerson();
    public EC1: EmergencyContact = new EmergencyContact();
    public EC2: EmergencyContact = new EmergencyContact();
    public Grade: ClassGrade = new ClassGrade();
    public PackageID: number = 0;
    public Allergies: Allergy[] = [];
    public Vaccines: Vaccine[] = [];
    public InfectiousDiseases: InfectiousDisease[] = [];
}
