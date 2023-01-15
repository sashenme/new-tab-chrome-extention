import React, { useState, useEffect } from "react";
import Section from "../Section";
import Timezone from "./Timezones/Timezone";
import { Formik, Form, FieldArray } from "formik";
import cityTimezones from "city-timezones";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Button from "./Timezones/Button";

type TCity ={
  label: string;
  value: string;
  city: string;
  country: string
}

const Timezones = ({ onToggle, isActive, getFavorite, favoriteZones }) => {
  const [cities, setCities] = useState<TCity[]>([]);
  const [zones, setZones] = useState<TCity[]>(favoriteZones);

  useEffect(() => {
    const cityMapping = cityTimezones.cityMapping;
    let citiesOptions = [];
    cityMapping.forEach((city) => {
      citiesOptions.push({
        label: `${city.city}, ${city.country}`,
        value: city.timezone,
        city: city.city,
        country: city.iso3,
      });
    });
    setCities(citiesOptions);
  }, []);

  useEffect(() => {
    if (favoriteZones === null) {
      setZones([]);
    } else {
      setZones(favoriteZones);
    }
  }, [favoriteZones]);

  return (
    <Section title={"Timezones"} onToggle={onToggle} isActive={isActive}>
      <DragDropContext
        onDragEnd={(param) => {
          const srcI = param.source.index;
          const desI = param.destination?.index;
          if (desI) {
            zones.splice(desI, 0, zones.splice(srcI, 1)[0]);
            setZones(zones);
          }
        }}
      >
        {zones && (
          <Formik
            enableReinitialize
            initialValues={{
              favoriteZone: zones,
            }}
            onSubmit={(values) => {
              console.log(values);
              getFavorite(values);
            }}
          >
            {({
              values,
              isValid,
              errors,
              touched,
              handleSubmit,
              setFieldValue,
              setFieldTouched,
              handleChange,
              handleBlur,
            }) => (
              <Form>
                <FieldArray
                  name="favoriteZone"
                  render={(arrayHelpers) => (
                    <>
                      <Droppable droppableId="droppable-1">
                        {(provided, _) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="grid gap-2"
                          >
                            {values.favoriteZone &&
                              values.favoriteZone.map((item, index) => (
                                <Draggable
                                  key={item.city + item.country}
                                  draggableId={
                                    "draggable-" + item.city + item.country
                                  }
                                  index={index}
                                >
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      style={{
                                        ...provided.draggableProps.style,
                                        boxShadow: snapshot.isDragging
                                          ? "0 4px 16px rgba(0,0,0,.2), 0 8px 16px rgba(0,0,0,.5)"
                                          : "none",
                                      }} 
                                      className="rounded-lg"
                                    > 
                              <Timezone
                              key={index}
                              dragHandle={...provided.dragHandleProps}
                              name={`favoriteZone[${index}].type`}
                              options={cities}
                              value={cities.filter(
                                (option) => option.label === item.label
                              )}
                              defaultValue={cities.filter(
                                (option) => option.label === item.label
                              )}
                              onChange={(values) => {
                                setFieldValue(
                                  `favoriteZone.${index}.value`,
                                  values.value
                                );
                                setFieldValue(
                                  `favoriteZone.${index}.label`,
                                  values.label
                                );
                                setFieldValue(
                                  `favoriteZone.${index}.city`,
                                  values.city
                                );
                                setFieldValue(
                                  `favoriteZone.${index}.country`,
                                  values.country
                                );
                                handleSubmit();
                              }}
                              onBlur={() =>
                                setFieldTouched(
                                  `favoriteZone.${index}.value`,
                                  true
                                )
                              }
                              onDelete={() => {
                                arrayHelpers.remove(index);
                                handleSubmit();
                              }}                              
                              isOnDrag={snapshot.isDragging}
                            />
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                      
                      <Button
                        onClick={() =>
                          arrayHelpers.push({
                            label: "",
                            value: "",
                          })
                        }
                      />
                    </>
                  )}
                />
              </Form>
            )}
          </Formik>
        )}
      </DragDropContext>
    </Section>
  );
};

export default Timezones;
