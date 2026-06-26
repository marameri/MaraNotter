import 'package:flutter/material.dart';

class WaveformPainter extends CustomPainter {
  final List<double> wavePoints;
  final bool isRecording;

  WaveformPainter({
    required this.wavePoints,
    required this.isRecording,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = const Color(0xFF6366F1)
      ..strokeWidth = 2.0
      ..strokeCap = StrokeCap.round;

    final centerY = size.height / 2;
    final width = size.width / (wavePoints.length + 1);

    if (wavePoints.isEmpty) {
      // Draw center line if no data
      canvas.drawLine(
        Offset(0, centerY),
        Offset(size.width, centerY),
        paint..strokeWidth = 1.0,
      );
      return;
    }

    for (int i = 0; i < wavePoints.length - 1; i++) {
      final x1 = i * width;
      final y1 = centerY - (wavePoints[i] * size.height / 2);

      final x2 = (i + 1) * width;
      final y2 = centerY - (wavePoints[i + 1] * size.height / 2);

      canvas.drawLine(
        Offset(x1, y1),
        Offset(x2, y2),
        paint,
      );
    }

    // Draw center line
    paint.strokeWidth = 0.5;
    canvas.drawLine(
      Offset(0, centerY),
      Offset(size.width, centerY),
      paint,
    );
  }

  @override
  bool shouldRepaint(WaveformPainter oldDelegate) {
    return oldDelegate.wavePoints != wavePoints ||
        oldDelegate.isRecording != isRecording;
  }
}
