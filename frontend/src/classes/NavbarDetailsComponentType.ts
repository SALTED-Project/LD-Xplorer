export class NavbarDetails {

    heading: string|null;
    description: string|null;
    image_path: string;
    image_link: string;

    constructor();
    constructor(heading?: string, description?: string, image_path?: string, image_link?: string) {
        this.heading = heading? heading : null;
        this.description = description? description : null;
        this.image_path = image_path? image_path : "path missing";
        this.image_link = image_link? image_link : "link missing";
    }
}
