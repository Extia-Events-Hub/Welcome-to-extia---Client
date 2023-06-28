import React, { useState } from "react";
import "./HackathonPage.scss";
import CarouselHackathon from "./CarouselHackathon/CarouselHackathon";
import Form from "./Form/Form";

export default function HackathonPage() {
    return (
      <div className="containerHackathon" id="Hackathon">
          <CarouselHackathon/>
          <Form/>
      </div>
    );
}