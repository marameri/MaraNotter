import 'package:flutter/material.dart';
import 'package:record/record.dart';
import 'package:get/get.dart';

class RecordingController extends GetxController {
  final AudioRecorder _audioRecorder = AudioRecorder();
  
  final isRecording = false.obs;
  final duration = 0.obs;
  final fileSize = 0.obs;
  final wavePoints = <double>[].obs;
  
  final titleController = TextEditingController();
  final descriptionController = TextEditingController();
  
  late String recordingPath;

  @override
  void onInit() {
    super.onInit();
    _initializeRecording();
  }

  Future<void> _initializeRecording() async {
    if (await _audioRecorder.hasPermission()) {
      recordingPath = '/tmp/recording_${DateTime.now().millisecondsSinceEpoch}.m4a';
    }
  }

  Future<void> toggleRecording() async {
    try {
      if (isRecording.value) {
        await stopRecording();
      } else {
        await startRecording();
      }
    } catch (e) {
      Get.snackbar('Error', e.toString());
    }
  }

  Future<void> startRecording() async {
    try {
      if (await _audioRecorder.hasPermission()) {
        await _audioRecorder.start();
        isRecording.value = true;
        
        // Update duration every 100ms
        while (isRecording.value) {
          final current = await _audioRecorder.current;
          if (current != null) {
            duration.value = current.inSeconds;
            // Simulate waveform points
            _updateWaveform();
          }
          await Future.delayed(const Duration(milliseconds: 100));
        }
      }
    } catch (e) {
      Get.snackbar('Recording Error', e.toString());
    }
  }

  Future<void> stopRecording() async {
    try {
      final path = await _audioRecorder.stop();
      isRecording.value = false;
      
      if (path != null) {
        recordingPath = path;
      }
    } catch (e) {
      Get.snackbar('Stop Error', e.toString());
    }
  }

  void _updateWaveform() {
    // Simulate waveform data
    wavePoints.add((DateTime.now().millisecond % 100) / 50.0 - 1.0);
    if (wavePoints.length > 100) {
      wavePoints.removeAt(0);
    }
  }

  Future<void> saveRecording() async {
    try {
      // TODO: Upload to backend
      Get.snackbar('Success', 'Recording saved successfully');
      Get.back();
    } catch (e) {
      Get.snackbar('Error', e.toString());
    }
  }

  String formatDuration(int seconds) {
    int minutes = seconds ~/ 60;
    int remainingSeconds = seconds % 60;
    return '${minutes.toString().padLeft(2, '0')}:${remainingSeconds.toString().padLeft(2, '0')}';
  }

  @override
  void onClose() {
    titleController.dispose();
    descriptionController.dispose();
    _audioRecorder.dispose();
    super.onClose();
  }
}
