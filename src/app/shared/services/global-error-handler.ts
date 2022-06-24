import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable, NgZone } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(
        private modalService: NgbModal,
        private zone: NgZone
    ) { }

    handleError(error: any) {
        // Check if it's an error from an HTTP response
        if (!(error instanceof HttpErrorResponse)) {
            error = error.rejection; // get the error object
        }
        this.zone.run(() =>
            this.modalService.open(
                (error?.message || 'Undefined client error',
                    error?.status), { centered: true }
            )
        );

        console.error('Error from global error handler', error);
    }
}