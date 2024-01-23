export class ParamsObject {

    propertyOfInterest: string;
    pathToPropertyValue: Array<string>;
    notFoundMessage: string|null;

    constructor( propertyOfInterest: string, pathToPropertyValue: Array<string>, notFoundMessage: string|null) {
        this.propertyOfInterest = propertyOfInterest;
        this.pathToPropertyValue = pathToPropertyValue;
        this.notFoundMessage = notFoundMessage;
    }

}