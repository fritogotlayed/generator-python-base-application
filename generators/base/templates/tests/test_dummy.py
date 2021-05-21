from <%= sourceFolder %> import app


def test_dummy():
    ret = app.main()

    assert ret == 0
