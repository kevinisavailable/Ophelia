import { Card, Modal } from "@mantine/core"
import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

const FaceRecognition = ({imageUrl , open , close ,setLock}) => {
  const videoRef = useRef(null);
  const [isFaceMatched, setIsFaceMatched] = useState(false);
  useEffect(() => {
    let video;
    const compareFaces = async (imageUrl) => {
        const labeledFaceDescriptors = await getLabeledFaceDescriptions(imageUrl);
        const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);
        setInterval(async () => {
          const detections = await faceapi
            .detectAllFaces(video)
            .withFaceLandmarks()
            .withFaceDescriptors();

            if (detections.length > 0) {
                const bestMatch = faceMatcher.findBestMatch(detections[0].descriptor);
                setIsFaceMatched(bestMatch.label === "Provided Face");
                setLock(isFaceMatched)
                close()
              } else {
                setIsFaceMatched(false);
              }
      }, 100);
    };

    const startWebcam = () => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          video.srcObject = stream;
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const getLabeledFaceDescriptions = async (imageUrl) => {
        const img = await faceapi.fetchImage(imageUrl);
        const detections = await faceapi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor();
        return [
          new faceapi.LabeledFaceDescriptors("Provided Face", [detections.descriptor]),
        ];
      };

    const initialize = async () => {
      await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      ]);

      video = videoRef.current;
      if(open){
        startWebcam();
        compareFaces(imageUrl);
      }
      };

    initialize();
  }, [open]);

  return (
    <Modal opened={open}  onClose={close} title="Verify Face to Unlock" centered>
    <Card>
      <video ref={videoRef} id="video" autoPlay muted width='500' height='500'/>
      {isFaceMatched ? <p>Face matched!</p> : <p>Face not matched!</p>}
      </Card>
    </Modal>
  );
};

export default FaceRecognition;



