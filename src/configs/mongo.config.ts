import { ConfigService } from "@nestjs/config";
import { TypegooseModuleOptions } from "nestjs-typegoose";

export const getMongoConfig = async (configService: ConfigService): Promise<TypegooseModuleOptions> => {
    return {
        uri: getMongoString(configService),
        ...getMongoOptions()
    };
};

const getMongoString = (configService: ConfigService) =>
  configService.get('MONGO_URL')
  // "mongodb://" +
  // configService.get("MONGO_LOGIN") +
  // ":" +
  // configService.get("MONGO_PASSWORD") +
  // "@" +
  // configService.get("MONGO_HOST") +
  // ":" +
  // configService.get("MONGO_PORT") +
  // "/" +
  // configService.get("MONGO_AUTHDATABASE");
  //  // + "/" +
  // // configService.get("MONGO_AUTHMECHANISM");

//mongodb://admin:admin@localhost:27017/?authMechanism=DEFAULT

const getMongoOptions = () => ({
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //for ipv4
    family: 4
});