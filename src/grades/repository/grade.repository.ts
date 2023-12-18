import { Inject, Injectable } from "@nestjs/common";
import sequelize from "sequelize";
import { Grade } from "../entities/grade.entity";

@Injectable()
export class GradeRepository {

    constructor(@Inject(Grade) private gradeRepository: typeof Grade){
    
    }


    async findManyByStudentId(
        studentId: string
    ) {
        return this.gradeRepository.findAndCountAll({where:{
            student:{
                id:studentId
            }
        }});
    }

    async findMany() {
        return this.gradeRepository.findAndCountAll({
            attributes: {
                include: [ // this adds avg attribute to others instead of rewriting
                  [sequelize.fn('avg', sequelize.col('grade.value')), 'avgGrade'],
                ],
              },
              group: ['product.id'],
        });
    }
    
}

