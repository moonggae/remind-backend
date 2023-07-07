import { readdir, readdirSync } from "fs"
import { join } from "path"
import { Image } from "src/image/entities/image.entity"
import { MigrationInterface, QueryRunner } from "typeorm"

export class Image1688455356907 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const imageRepo = queryRunner.connection.getRepository(Image)
        const files = readdirSync(join(__dirname, '..', 'file'))
        
        for(var i in files) {
            if(files[i].startsWith('.')) {
                console.log(`startsWith('.'): ${files[i]}`)
            } else {
                const insert =  await imageRepo.create({ fileName: files[i] })
                await imageRepo.save(insert)
            }
        }

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const imageRepo = queryRunner.connection.getRepository(Image)
        await imageRepo.clear()
    }

}
