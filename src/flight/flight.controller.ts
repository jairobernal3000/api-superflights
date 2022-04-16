import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PassengerService } from 'src/passenger/passenger.service';
import { FlightDTO } from './dto/flight.dto';
import { FlightService } from './flight.service';

@ApiTags('flight')
@Controller('api/v1/flight')
export class FlightController {
  constructor( 
    private readonly flightService: FlightService, 
    private readonly passengerService: PassengerService 
  ){}

  @Post()
  @ApiOperation({ summary: 'Create Flight' })
  create(@Body() flightDTO: FlightDTO) {
    return this.flightService.create(flightDTO);
  }

  @Get()
  @ApiOperation({ summary: 'Return all Flights' })
  findAll () {
    return this.flightService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Search Flight by Id' })
  findOne(@Param('id') id: string) {
    return this.flightService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Flight' })
  update(@Param('id') id: string, @Body() flightDTO: FlightDTO) {
    return this.flightService.update(id, flightDTO);
  }

  @Delete(':id') 
  @ApiOperation({ summary: 'Delete Flight' })
  delete(@Param('id') id: string) {
    return this.flightService.delete(id);
  }

  @Post(':flightId/passenger/:passengerId')
  @ApiOperation({ summary: 'Assign Passenger to a Flight' })
  async addPassenger(
    @Param('flightId') flightId: string, 
    @Param('passengerId') passengerId: string
  ) {
    const passenger = await this.passengerService.findOne(passengerId);
    if ( !passenger ) throw new HttpException('Passenger Not Found', HttpStatus.NOT_FOUND);
    return this.flightService.addPassenger(flightId, passengerId);
  }
}
