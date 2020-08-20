# Architectural Decision Records (ADR) 2: NodeJS Framework Choice

## Context and Problem Statement

I must choose the API layer technology. 
I must use a JavaScript framework, per the requirements.

Primary choices to investigate are:

* Loopback.io
* ExpressJS
* Vanilla NodeJS

## Decision Outcome

I will use Loopback.io for my implementation.

This is the preferred stack to use given the requirements, and per documentation appears to be a very robust framework.

## Consequences

* Loopback.io is driven by the OpenAPI spec, so we can begin with our API documentation
* My Loopback.io experience is zero, so a non-trivial amount of time will be spent on research and setup 
