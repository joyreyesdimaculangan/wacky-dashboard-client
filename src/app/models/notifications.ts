export interface Notifications {
    id: string;
    title: string;
    message: string;
    date: string;
    isNew: boolean;
    reservationId: string;
    reservation: {
        packageID: string;
        package: {
            name: string;
        };
    };
}
