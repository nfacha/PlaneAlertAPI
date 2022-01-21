import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Plane extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: "varchar", length: 255})
    name!: string;

    @Column({type: "varchar", length: 255})
    icao!: string;

    @Column({type: "varchar", length: 255})
    registration!: string;

    @Column({type: "boolean", default: true})
    active!: boolean;

    @Column({type: "varchar", length: 255, default: "large_airport,medium_airport,small_airport"})
    allowed_airports!: string;

    @Column({type: "integer", default: 1800})
    refresh_interval!: number;

    @Column({type: "timestamp", nullable: true})
    last_refresh!: Date;

    @Column({type: "timestamp", nullable: true})
    next_refresh!: Date;

    @Column({type: "timestamp", nullable: true})
    last_seen!: Date;

    @Column({type: "boolean", default: true})
    on_ground!: boolean;

    @Column({type: "boolean", default: false})
    live_track!: boolean;

    @Column({type: "integer", nullable: true})
    last_lat!: number | null;

    @Column({type: "integer", nullable: true})
    last_lng!: number | null;

    @Column({type: "text", nullable: true})
    discord_webhook!: string;

}
