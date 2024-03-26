---
title: Piezo-ionic Hydrogel-based Tactile Panels
summary: A novel self-powered tactile sensor based on polyacrylamide hydrogels.
tags:
  - Hardware
date: "2023-06-10T00:00:00Z"


image:
  caption: ''
  focal_point: Smart

# links:
#   - icon: github
#     icon_pack: fab
#     name: Code
#     url: https://github.com/JiaqingLiuAllen/CheerUp
url_code: ''
url_pdf: ''
url_slides: ''
url_video: ''

---
**Key words:** Piezo-ionic Hydrogel, Tactile Sensing, Fabrication, Flexible Electronics.

This project, CheerUp, is a pioneering response to the largely untapped potential of using computing to offer emotional support and enhance mental well-being, situated at the fascinating intersection of technology and psychological health support. By harnessing the compact and versatile **Raspberry Pi 4** platform, it integrates emotional recognition with personalized music therapy. Utilizing facial expression analysis, the system detects the user's emotional state in real time and plays music from corresponding Spotify playlist specifically tailored to either enhance or complement the current emotion. Leveraging pre-trained **machine learning** models, **OpenCV** library, **Spotify API** integration, and real-time system monitoring, CheerUp aims to provide immediate emotional support, thus contributing significantly to the improvement of the user's mental well-being.

![system-arch](system-arch.jpg)

The architecture of this project commences with the acquisition of video data from a camera. This captured video is segmented into a series of frames, which are subsequently subjected to critical image processing tasks, including conversion to grayscale. This preparatory step is essential for facilitating the subsequent face detection process, utilizing the Haar Cascade classifier. Notably, this classifier demonstrates considerable proficiency in identifying faces within images, regardless of whether the subjects are human, animal, or absent altogether.

![device](device.jpg)

Initially, the project was configured to playback songs that were manually selected and stored within the project directory. This approach, however, was deemed excessively static and somewhat limiting. To enhance the system's flexibility and responsiveness to emotional cues, Spotify integration was introduced. This integration enables the system to dynamically select and play music playlists that correspond to the detected emotions of the user.

A key feature was made in how music playback is handled post-emotion detection. Now, once an emotion is identified and a corresponding playlist starts, the music continues for five minutes. This approach effectively avoids the instability of changing music with every emotional shift. Instead, it provides a stable and soothing auditory experience by maintaining a consistent playlist for a set duration.

You can click the following picture to see the **demo video** on YouTube! 😃
[![Demo](https://img.youtube.com/vi/XFz4RYfaeB8/0.jpg)](https://www.youtube.com/watch?v=XFz4RYfaeB8)

I am currently designing a GUI to make this project more accessible and user-friendly for users without previous technical knowledge in this field.

**Acknowledgement**:  
I'd like to express my sincere gratitude to Prof. Weili Deng for his advisement on this thesis and Prof. Weiqing Yang for providing lab environments for relevant experiments.
