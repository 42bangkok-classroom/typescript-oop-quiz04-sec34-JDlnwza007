import { Injectable, NotFoundException } from '@nestjs/common';
import { IMission } from './mission.interface';
import * as fs from 'fs';

@Injectable()
export class MissionService {
  private readonly missions = [
    { id: 1, codename: 'OPERATION_STORM', status: 'ACTIVE' },
    { id: 2, codename: 'SILENT_SNAKE', status: 'COMPLETED' },
    { id: 3, codename: 'RED_DAWN', status: 'FAILED' },
    { id: 4, codename: 'BLACKOUT', status: 'ACTIVE' },
    { id: 5, codename: 'ECHO_FALLS', status: 'COMPLETED' },
    { id: 6, codename: 'GHOST_RIDER', status: 'COMPLETED' }
  ];

  getSummary() {
    let summary: { [key: string]: number } = {};

    for (let i = 0; i < this.missions.length; i++) {
      
      let currentMission = this.missions[i];
      let currentStatus = currentMission.status;

      if (summary[currentStatus] === undefined) {
        summary[currentStatus] = 1;
      } 
      else {
        summary[currentStatus] = summary[currentStatus] + 1;
      }
    }
    return summary;
  }

  findAll() {

    const rawData = fs.readFileSync('data/missions.json', 'utf-8');
    const missions: IMission[] = JSON.parse(rawData);
    const result = missions.map((mission) => {

      let durationDays = -1;
      if (mission.endDate !== null) {
        const startMillis = new Date(mission.startDate).getTime();
        const endMillis = new Date(mission.endDate).getTime();
        const diffInMs = endMillis - startMillis;
        const msInOneDay = 1000 * 60 * 60 * 24;
        durationDays = diffInMs / msInOneDay;
      }

     mission.durationDays = durationDays;
      
      return mission; 
    });
    return result;
  }
  
}