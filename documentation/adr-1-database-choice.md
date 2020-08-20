# Architectural Decision Records (ADR) 1: Database Choice

## Context and Problem Statement

I must choose a persistence layer for our Pokemon data. The two primary choices are:

* MongoDB
* PostgreSQL (or other traditional relation database tools)

## Decision Outcome

I will use MongoDB for my implementation.

MongoDB is a very strong choice for this challenge, though we stand to lose what traditional SQL gives.
Given our data lives in JSON already, MongoDB is a quick implementation offering minimal entry barrier.

Our data does have a structured data model, meaning we could benefit strongly from PostgreSQL, but we'd have to take
the extra effort to set up the schema ourselves.

At this time, we don't know if the data model is static or not. If it changes, a PostgreSQL implementation will be much less flexible.

## Consequences

* Our application can't take advantage of database normalization for efficient data storage
* Our application can't make use of strict database constraints
* The initial data model is easier to generate with NoSQL
* If our data model changes, we don't have to make changes to our model