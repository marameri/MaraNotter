import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../controllers/recording_controller.dart';
import '../widgets/waveform_painter.dart';
import '../widgets/recording_button.dart';

class RecordingScreen extends StatelessWidget {
  const RecordingScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final controller = Get.put(RecordingController());

    return Scaffold(
      appBar: AppBar(
        title: const Text('New Recording'),
        centerTitle: true,
      ),
      body: Obx(
        () => SingleChildScrollView(
          child: Column(
            children: [
              // Waveform Display
              Container(
                margin: const EdgeInsets.all(20),
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: Theme.of(context).colorScheme.primaryContainer,
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Column(
                  children: [
                    // Real-time Waveform
                    Container(
                      height: 150,
                      decoration: BoxDecoration(
                        color: Theme.of(context).colorScheme.surface,
                        borderRadius: BorderRadius.circular(15),
                      ),
                      child: CustomPaint(
                        painter: WaveformPainter(
                          wavePoints: controller.wavePoints,
                          isRecording: controller.isRecording.value,
                        ),
                      ),
                    ),
                    const SizedBox(height: 30),
                    // Duration Display
                    Text(
                      controller.formatDuration(controller.duration.value),
                      style: Theme.of(context).textTheme.displayMedium?.copyWith(
                            fontWeight: FontWeight.bold,
                          ),
                    ),
                    const SizedBox(height: 10),
                    Text(
                      'File Size: ${(controller.fileSize.value / 1024).toStringAsFixed(2)} KB',
                      style: Theme.of(context).textTheme.bodySmall?.copyWith(
                            color: Colors.grey,
                          ),
                    ),
                  ],
                ),
              ),
              // Recording Button
              Padding(
                padding: const EdgeInsets.symmetric(vertical: 20),
                child: RecordingButton(
                  isRecording: controller.isRecording.value,
                  onPressed: () => controller.toggleRecording(),
                ),
              ),
              // Title Input
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                child: TextField(
                  controller: controller.titleController,
                  decoration: InputDecoration(
                    labelText: 'Title',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 15),
              // Description Input
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                child: TextField(
                  controller: controller.descriptionController,
                  maxLines: 3,
                  decoration: InputDecoration(
                    labelText: 'Description',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 30),
              // Action Buttons
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
                child: Row(
                  children: [
                    Expanded(
                      child: ElevatedButton(
                        onPressed: () => Get.back(),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.grey[400],
                        ),
                        child: const Text('Cancel'),
                      ),
                    ),
                    const SizedBox(width: 15),
                    Expanded(
                      child: ElevatedButton(
                        onPressed: controller.isRecording.value
                            ? null
                            : () => controller.saveRecording(),
                        child: const Text('Save & Transcribe'),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
