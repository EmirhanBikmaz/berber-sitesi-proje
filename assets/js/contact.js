$(document).ready(function(){
    
    (function($) {
        "use strict";

    // Basit bir "cevap kontrolü" kuralı (robot kontrolü gibi)
    jQuery.validator.addMethod('answercheck', function (value, element) {
        return this.optional(element) || /^\bcat\b$/.test(value)
    }, "Lütfen doğru cevabı yazın.");

    // FORM DOĞRULAMA VE SAHTE GÖNDERİM KISMI
    $(function() {
        $('#contactForm').validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                subject: {
                    required: true,
                    minlength: 4
                },
                number: {
                    required: true,
                    minlength: 5
                },
                email: {
                    required: true,
                    email: true
                },
                message: {
                    required: true,
                    minlength: 20
                }
            },
            messages: {
                name: {
                    required: "Lütfen adınızı girin.",
                    minlength: "Adınız en az 2 karakterden oluşmalıdır."
                },
                subject: {
                    required: "Lütfen bir konu başlığı girin.",
                    minlength: "Konu başlığı en az 4 karakter olmalıdır."
                },
                number: {
                    required: "Lütfen telefon numaranızı girin.",
                    minlength: "Telefon numarası en az 5 karakter olmalıdır."
                },
                email: {
                    required: "Lütfen e-posta adresinizi girin.",
                    email: "Lütfen geçerli bir e-posta adresi girin."
                },
                message: {
                    required: "Lütfen mesajınızı yazın.",
                    minlength: "Mesajınız çok kısa, lütfen en az 20 karakter yazın."
                }
            },
            // BURASI DEĞİŞTİ: PHP'ye gitmeden direkt başarılı sayıyoruz
            submitHandler: function(form) {
                // Gönder butonunu pasif yap (tıklanmasın)
                $('#contactForm :input').attr('disabled', 'disabled');
                
                // 1 Saniye bekleyip (sanki yükleniyor gibi) başarı mesajını aç
                setTimeout(function() {
                    $('#contactForm').fadeTo("slow", 1, function() {
                        $(this).find(':input').attr('disabled', 'disabled');
                        $(this).find('label').css('cursor','default');
                        
                        // Başarı Modalını (Penceresini) Aç
                        $('#success').fadeIn();
                        $('.modal').modal('hide');
                        $('#success').modal('show');
                        
                        // Formu Temizle
                        $('#contactForm')[0].reset();
                        
                        // 3 saniye sonra butonu tekrar aktif et (isteğe bağlı)
                        setTimeout(function(){
                             $('#contactForm :input').removeAttr('disabled');
                        }, 3000);
                    })
                }, 1000); // 1000 milisaniye = 1 saniye gecikme
            }
        })
    })
        
 })(jQuery)
})