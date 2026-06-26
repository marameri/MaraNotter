import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:dio/dio.dart';

class HomeController extends GetxController {
  final isLoading = false.obs;
  final recordings = <Map<String, dynamic>>[].obs;
  final filteredRecordings = <Map<String, dynamic>>[].obs;
  
  final dio = Dio();
  final box = GetStorage();
  
  final apiUrl = 'http://localhost:3000/api';

  @override
  void onInit() {
    super.onInit();
    fetchRecordings();
  }

  Future<void> fetchRecordings() async {
    try {
      isLoading.value = true;
      
      final token = box.read('auth_token') ?? '';
      
      final response = await dio.get(
        '$apiUrl/recordings',
        options: Options(
          headers: {'Authorization': 'Bearer $token'},
        ),
      );

      if (response.statusCode == 200) {
        recordings.value = List<Map<String, dynamic>>.from(
          response.data as List,
        );
        filteredRecordings.value = recordings;
      }
    } catch (e) {
      Get.snackbar('Error', 'Failed to fetch recordings');
    } finally {
      isLoading.value = false;
    }
  }

  void searchRecordings(String query) {
    if (query.isEmpty) {
      filteredRecordings.value = recordings;
    } else {
      filteredRecordings.value = recordings
          .where((rec) =>
              (rec['title'] as String).toLowerCase().contains(query.toLowerCase()) ||
              (rec['description'] as String)
                  .toLowerCase()
                  .contains(query.toLowerCase()))
          .toList();
    }
  }
}
