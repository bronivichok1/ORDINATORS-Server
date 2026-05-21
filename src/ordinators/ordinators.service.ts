import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ordinator } from './entities/ordinators.entity';
import { University } from './entities/university.entity';
import { CurrentControl } from './entities/current_control.entity';
import { Money } from './entities/money.entity';
import { Session } from './entities/session.entity';
import { Vacation } from './entities/vacation.entity';
import { EducationInfo } from './entities/education_info.entity';
import { SocialLeave } from './entities/social_leave.entity';
import { Supervisor } from './entities/supervisors.entity';
import { CreateOrdinatorDto, SocialLeaveDto, SupervisorDto } from './dto/create-ordinator.dto';
import { UpdateOrdinatorDto } from './dto/update-ordinator.dto';

@Injectable()
export class OrdinatorsService {
  constructor(
    @InjectRepository(Ordinator)
    private ordinatorsRepository: Repository<Ordinator>,
    @InjectRepository(University)
    private universityRepository: Repository<University>,
    @InjectRepository(CurrentControl)
    private currentControlRepository: Repository<CurrentControl>,
    @InjectRepository(Money)
    private moneyRepository: Repository<Money>,
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
    @InjectRepository(Vacation)
    private vacationRepository: Repository<Vacation>,
    @InjectRepository(EducationInfo)
    private educationInfoRepository: Repository<EducationInfo>,
    @InjectRepository(SocialLeave)
    private socialLeaveRepository: Repository<SocialLeave>,
    @InjectRepository(Supervisor)
    private supervisorRepository: Repository<Supervisor>,
  ) {}

  async create(createOrdinatorDto: CreateOrdinatorDto) {
    let university: University | null = null;
    let currentControl: CurrentControl | null = null;
    let money: Money | null = null;
    let session: Session | null = null;
    let vacation: Vacation | null = null;
    let educationInfo: EducationInfo | null = null;

    if (createOrdinatorDto.universityName) {
      university = this.universityRepository.create({
        name: createOrdinatorDto.universityName,
        graduationYear: createOrdinatorDto.graduationYear,
        department: createOrdinatorDto.department,
        specialtyProfile: createOrdinatorDto.specialtyProfile,
        specialty: createOrdinatorDto.specialty,
        preparationForm: createOrdinatorDto.preparationForm,
      });
      university = await this.universityRepository.save(university);
    }

    if (createOrdinatorDto.scores) {
      currentControl = this.currentControlRepository.create({
        scores: createOrdinatorDto.scores,
      });
      currentControl = await this.currentControlRepository.save(currentControl);
    }

    if (createOrdinatorDto.allowanceStartDate || createOrdinatorDto.allowanceEndDate) {
      money = this.moneyRepository.create({
        allowanceStartDate: createOrdinatorDto.allowanceStartDate,
        allowanceEndDate: createOrdinatorDto.allowanceEndDate,
      });
      money = await this.moneyRepository.save(money);
    }

    if (createOrdinatorDto.sessionStart || createOrdinatorDto.sessionEnd) {
      session = this.sessionRepository.create({
        sessionStart: createOrdinatorDto.sessionStart,
        sessionEnd: createOrdinatorDto.sessionEnd,
      });
      session = await this.sessionRepository.save(session);
    }

    educationInfo = this.educationInfoRepository.create({});
    educationInfo = await this.educationInfoRepository.save(educationInfo);

    const ordinatorData: Partial<Ordinator> = {
      fio: createOrdinatorDto.fio,
      fioEn: createOrdinatorDto.fioEn,
      birthYear: createOrdinatorDto.birthYear,
      gender: createOrdinatorDto.gender,
      country: createOrdinatorDto.country,
      enrollmentDate: createOrdinatorDto.enrollmentDate,
      dismissalDate: createOrdinatorDto.dismissalDate,
      dismissalReason: createOrdinatorDto.dismissalReason,
      mobilePhone: createOrdinatorDto.mobilePhone,
      identityDocument: createOrdinatorDto.identityDocument,
      documentNumber: createOrdinatorDto.documentNumber,
      residenceAddress: createOrdinatorDto.residenceAddress,
      registrationExpiry: createOrdinatorDto.registrationExpiry,
      enrollmentOrderNumber: createOrdinatorDto.enrollmentOrderNumber,
      enrollmentOrderDate: createOrdinatorDto.enrollmentOrderDate,
      dismissalOrderNumber: createOrdinatorDto.dismissalOrderNumber,
      dismissalOrderDate: createOrdinatorDto.dismissalOrderDate,
      contractInfo: createOrdinatorDto.contractInfo,
      medicalCertificate: createOrdinatorDto.medicalCertificate,
      login: createOrdinatorDto.login,
      password: createOrdinatorDto.password,
      identNumber: createOrdinatorDto.identNumber,
      livingAddress: createOrdinatorDto.livingAddress,
      rivshCertificate: createOrdinatorDto.rivshCertificate,
      entryByInvitation: createOrdinatorDto.entryByInvitation,
      distributionInfo: createOrdinatorDto.distributionInfo,
      university: university || undefined,
      currentControl: currentControl || undefined,
      money: money || undefined,
      session: session || undefined,
      vacation: vacation || undefined,
      educationInfo: educationInfo || undefined,
    };

    const ordinator = this.ordinatorsRepository.create(ordinatorData);
    const savedOrdinator = await this.ordinatorsRepository.save(ordinator);

    if (createOrdinatorDto.socialLeaves && createOrdinatorDto.socialLeaves.length > 0) {
      const socialLeaves = createOrdinatorDto.socialLeaves.map((leave: SocialLeaveDto) =>
        this.socialLeaveRepository.create({
          ...leave,
          ordinator: savedOrdinator,
        }),
      );
      await this.socialLeaveRepository.save(socialLeaves);
    }

    if (createOrdinatorDto.supervisors && createOrdinatorDto.supervisors.length > 0) {
      const supervisors = createOrdinatorDto.supervisors.map((sup: SupervisorDto) =>
        this.supervisorRepository.create({
          ...sup,
          ordinator: savedOrdinator,
        }),
      );
      await this.supervisorRepository.save(supervisors);
    }

    return this.findOne(savedOrdinator.id);
  }

  async findAll() {
    try {
      return await this.ordinatorsRepository.find({
        relations: [
          'university',
          'currentControl',
          'money',
          'session',
          'vacation',
          'educationInfo',
          'socialLeaves',
          'supervisors',
        ],
      });
    } catch (error) {
      console.error('Error in findAll:', error);
      return [];
    }
  }

  async findOne(id: number) {
    const ordinator = await this.ordinatorsRepository.findOne({
      where: { id },
      relations: [
        'university',
        'currentControl',
        'money',
        'session',
        'vacation',
        'educationInfo',
        'socialLeaves',
        'supervisors',
      ],
    });

    if (!ordinator) {
      throw new NotFoundException(`Ordinator with ID ${id} not found`);
    }

    return ordinator;
  }

  async update(id: number, updateOrdinatorDto: UpdateOrdinatorDto) {
    const ordinator = await this.findOne(id);

    if (updateOrdinatorDto.fio !== undefined) ordinator.fio = updateOrdinatorDto.fio;
    if (updateOrdinatorDto.fioEn !== undefined) ordinator.fioEn = updateOrdinatorDto.fioEn;
    if (updateOrdinatorDto.birthYear !== undefined) ordinator.birthYear = updateOrdinatorDto.birthYear;
    if (updateOrdinatorDto.gender !== undefined) ordinator.gender = updateOrdinatorDto.gender;
    if (updateOrdinatorDto.country !== undefined) ordinator.country = updateOrdinatorDto.country;
    if (updateOrdinatorDto.enrollmentDate !== undefined) ordinator.enrollmentDate = updateOrdinatorDto.enrollmentDate;
    if (updateOrdinatorDto.dismissalDate !== undefined) ordinator.dismissalDate = updateOrdinatorDto.dismissalDate;
    if (updateOrdinatorDto.dismissalReason !== undefined) ordinator.dismissalReason = updateOrdinatorDto.dismissalReason;
    if (updateOrdinatorDto.mobilePhone !== undefined) ordinator.mobilePhone = updateOrdinatorDto.mobilePhone;
    if (updateOrdinatorDto.identityDocument !== undefined) ordinator.identityDocument = updateOrdinatorDto.identityDocument;
    if (updateOrdinatorDto.documentNumber !== undefined) ordinator.documentNumber = updateOrdinatorDto.documentNumber;
    if (updateOrdinatorDto.residenceAddress !== undefined) ordinator.residenceAddress = updateOrdinatorDto.residenceAddress;
    if (updateOrdinatorDto.registrationExpiry !== undefined) ordinator.registrationExpiry = updateOrdinatorDto.registrationExpiry;
    if (updateOrdinatorDto.enrollmentOrderNumber !== undefined) ordinator.enrollmentOrderNumber = updateOrdinatorDto.enrollmentOrderNumber;
    if (updateOrdinatorDto.enrollmentOrderDate !== undefined) ordinator.enrollmentOrderDate = updateOrdinatorDto.enrollmentOrderDate;
    if (updateOrdinatorDto.dismissalOrderNumber !== undefined) ordinator.dismissalOrderNumber = updateOrdinatorDto.dismissalOrderNumber;
    if (updateOrdinatorDto.dismissalOrderDate !== undefined) ordinator.dismissalOrderDate = updateOrdinatorDto.dismissalOrderDate;
    if (updateOrdinatorDto.contractInfo !== undefined) ordinator.contractInfo = updateOrdinatorDto.contractInfo;
    if (updateOrdinatorDto.medicalCertificate !== undefined) ordinator.medicalCertificate = updateOrdinatorDto.medicalCertificate;
    if (updateOrdinatorDto.login !== undefined) ordinator.login = updateOrdinatorDto.login;
    if (updateOrdinatorDto.password !== undefined) ordinator.password = updateOrdinatorDto.password;
    if (updateOrdinatorDto.identNumber !== undefined) ordinator.identNumber = updateOrdinatorDto.identNumber;
    if (updateOrdinatorDto.livingAddress !== undefined) ordinator.livingAddress = updateOrdinatorDto.livingAddress;
    if (updateOrdinatorDto.rivshCertificate !== undefined) ordinator.rivshCertificate = updateOrdinatorDto.rivshCertificate;
    if (updateOrdinatorDto.entryByInvitation !== undefined) ordinator.entryByInvitation = updateOrdinatorDto.entryByInvitation;
    if (updateOrdinatorDto.distributionInfo !== undefined) ordinator.distributionInfo = updateOrdinatorDto.distributionInfo;

    if (ordinator.university) {
      if (updateOrdinatorDto.universityName !== undefined) ordinator.university.name = updateOrdinatorDto.universityName;
      if (updateOrdinatorDto.graduationYear !== undefined) ordinator.university.graduationYear = updateOrdinatorDto.graduationYear;
      if (updateOrdinatorDto.department !== undefined) ordinator.university.department = updateOrdinatorDto.department;
      if (updateOrdinatorDto.specialtyProfile !== undefined) ordinator.university.specialtyProfile = updateOrdinatorDto.specialtyProfile;
      if (updateOrdinatorDto.specialty !== undefined) ordinator.university.specialty = updateOrdinatorDto.specialty;
      if (updateOrdinatorDto.preparationForm !== undefined) ordinator.university.preparationForm = updateOrdinatorDto.preparationForm;
    }

    if (ordinator.currentControl && updateOrdinatorDto.scores !== undefined) {
      ordinator.currentControl.scores = updateOrdinatorDto.scores;
    }

    if (ordinator.money) {
      if (updateOrdinatorDto.allowanceStartDate !== undefined) ordinator.money.allowanceStartDate = updateOrdinatorDto.allowanceStartDate;
      if (updateOrdinatorDto.allowanceEndDate !== undefined) ordinator.money.allowanceEndDate = updateOrdinatorDto.allowanceEndDate;
    }

    if (ordinator.session) {
      if (updateOrdinatorDto.sessionStart !== undefined) ordinator.session.sessionStart = updateOrdinatorDto.sessionStart;
      if (updateOrdinatorDto.sessionEnd !== undefined) ordinator.session.sessionEnd = updateOrdinatorDto.sessionEnd;
    }

    await this.ordinatorsRepository.save(ordinator);

    if (updateOrdinatorDto.socialLeaves !== undefined) {
      await this.socialLeaveRepository.delete({ ordinator: { id } });
      if (updateOrdinatorDto.socialLeaves.length > 0) {
        const socialLeaves = updateOrdinatorDto.socialLeaves.map((leave: SocialLeaveDto) =>
          this.socialLeaveRepository.create({
            ...leave,
            ordinator: ordinator,
          }),
        );
        await this.socialLeaveRepository.save(socialLeaves);
      }
    }

    if (updateOrdinatorDto.supervisors !== undefined) {
      await this.supervisorRepository.delete({ ordinator: { id } });
      if (updateOrdinatorDto.supervisors.length > 0) {
        const supervisors = updateOrdinatorDto.supervisors.map((sup: SupervisorDto) =>
          this.supervisorRepository.create({
            ...sup,
            ordinator: ordinator,
          }),
        );
        await this.supervisorRepository.save(supervisors);
      }
    }

    return this.findOne(id);
  }

  async remove(id: number) {
    const ordinator = await this.findOne(id);
    await this.ordinatorsRepository.remove(ordinator);
    return { message: `Ordinator with ID ${id} deleted successfully` };
  }
}