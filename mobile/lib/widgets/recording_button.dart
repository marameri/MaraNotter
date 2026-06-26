import 'package:flutter/material.dart';

class RecordingButton extends StatefulWidget {
  final bool isRecording;
  final VoidCallback onPressed;

  const RecordingButton({
    Key? key,
    required this.isRecording,
    required this.onPressed,
  }) : super(key: key);

  @override
  State<RecordingButton> createState() => _RecordingButtonState();
}

class _RecordingButtonState extends State<RecordingButton>
    with SingleTickerProviderStateMixin {
  late AnimationController _animationController;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 500),
      vsync: this,
    );
  }

  @override
  void didUpdateWidget(RecordingButton oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.isRecording) {
      _animationController.repeat();
    } else {
      _animationController.stop();
      _animationController.reset();
    }
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return ScaleTransition(
      scale: Tween<double>(begin: 1.0, end: 1.1).animate(
        CurvedAnimation(parent: _animationController, curve: Curves.easeInOut),
      ),
      child: FloatingActionButton(
        radius: 60,
        backgroundColor: widget.isRecording
            ? Colors.red
            : Theme.of(context).colorScheme.primary,
        onPressed: widget.onPressed,
        child: Icon(
          widget.isRecording ? Icons.stop : Icons.mic,
          size: 35,
          color: Colors.white,
        ),
      ),
    );
  }
}
