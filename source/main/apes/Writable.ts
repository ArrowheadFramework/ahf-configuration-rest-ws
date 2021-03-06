import { Writer } from "./Writer";

/**
 * Represents an object that can be encoded.
 */
export interface Writable {
    readonly isWritable: true;

    /**
     * Writes this object using given writer.
     * 
     * @param writer Write target.
     */
    write(writer: Writer);
}

/**
 * An ECMAScript array that implements the APES Writable interface.
 */
export class WritableArray<T> extends Array<T> implements Writable {
    public readonly isWritable: true;

    public write(writer: Writer) {
        writer.writeList(writer => this.forEach(item => writer.add(item)));
    }
}

/**
 * An ECMAScript error that implements the APES Writable interface.
 */
export class WritableError extends Error implements Writable {
    public readonly isWritable: true;

    public write(writer: Writer) {
        writer.writeMap(writer => writer
            .addText("Message", this.message));
    }
}