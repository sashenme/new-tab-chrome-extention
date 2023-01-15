import React, { useState, useEffect } from "react";
import PlusIcon from "../../../assets/icons/PlusIcon";
import Section from "../Section";
import Timezone from "./Timezones/Timezone";
import { Formik, Form, FieldArray } from "formik";
import cityTimezones from "city-timezones";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Button: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    type="button"
    className="bg-black hover:bg-gray-900 rounded-full px-4 py-2 flex items-center gap-1 w-full max-w-[8rem] mx-auto mt-4"
  >
    <PlusIcon />
    <span>Add timezone</span>
  </button>
);

const Timezones = ({ onToggle, isActive, getFavorite, favoriteZones }) => {
  const [cities, setCities] = useState([]);
  const [zones, setZones] = useState(favoriteZones);

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

  //save reference for dragItem and dragOverItem
  const dragItem = React.useRef<any>(null);
  const dragOverItem = React.useRef<any>(null);

  //const handle drag sorting
  const handleSort = () => {
    //duplicate items
    let _fruitItems = [...zones];

    //remove and save the dragged item content
    const draggedItemContent = _fruitItems.splice(dragItem.current, 1)[0];

    //switch the position
    _fruitItems.splice(dragOverItem.current, 0, draggedItemContent);

    //reset the position ref
    dragItem.current = null;
    dragOverItem.current = null;

    //update the actual array
    setZones(_fruitItems);
  };

  return (
    <Section title={"Timezones"} onToggle={onToggle} isActive={isActive}>
      <DragDropContext
        onDragEnd={(param) => {
          const srcI = param.source.index;
          const desI = param.destination?.index;
          if (desI) {
            zones.splice(desI, 0, zones.splice(srcI, 1)[0]);
            //  setZones(sorted)
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
                                          ? "0 4px 16px rgba(0,0,0,.2)"
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
                              onDragStart={(e) => {
                                dragItem.current = index;
                                console.log("dragged");
                              }}
                              onDragEnter={(e) =>
                                (dragOverItem.current = index)
                              }
                              onDragEnd={handleSort}
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
